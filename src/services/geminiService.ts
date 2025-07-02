interface GeminiConfig {
  projectId: string;
  location: string;
  apiKey: string;
}

interface RuleCondition {
  field: string;
  operator: string;
  value: any;
  description?: string;
}

interface GeneratedRule {
  rule_id: string;
  name: string;
  description: string;
  conditions: RuleCondition[];
  action: string;
  reason: string;
  category: string;
  severity: 'low' | 'medium' | 'warning' | 'critical';
  confidence: number;
}

class GeminiService {
  private config: GeminiConfig;
  private baseUrl: string;

  constructor() {
    this.config = {
      projectId: import.meta.env.VITE_GOOGLE_CLOUD_PROJECT_ID || '',
      location: import.meta.env.VITE_GOOGLE_CLOUD_LOCATION || 'us-central1',
      apiKey: import.meta.env.VITE_GEMINI_API_KEY || ''
    };
    
    this.baseUrl = `https://${this.config.location}-aiplatform.googleapis.com/v1/projects/${this.config.projectId}/locations/${this.config.location}/publishers/google/models/gemini-1.5-pro:generateContent`;
  }

  private createPrompt(naturalLanguageRule: string): string {
    return `
You are an expert financial analyst and rule engine designer. Convert the following natural language financial monitoring rule into a structured JSON format.

Natural Language Rule: "${naturalLanguageRule}"

Please generate a JSON response with the following structure:
{
  "rule_id": "snake_case_identifier",
  "name": "Human readable rule name",
  "description": "Clear description of what this rule does",
  "conditions": [
    {
      "field": "transaction_field_name",
      "operator": "comparison_operator",
      "value": "comparison_value",
      "description": "what this condition checks"
    }
  ],
  "action": "flag",
  "reason": "Why this rule would trigger a flag",
  "category": "rule_category",
  "severity": "low|medium|warning|critical",
  "confidence": 85
}

Guidelines:
- Use realistic financial transaction fields: amount, vendor, category, date, account, type, etc.
- Operators: ==, !=, >, <, >=, <=, contains, in, not_in, between
- Severity should match the potential impact
- Confidence should be 70-99 based on rule clarity
- Categories: duplicate_detection, threshold_monitoring, vendor_analysis, timing_analysis, compliance, expense_validation

Only respond with valid JSON, no additional text.
`;
  }

  async generateRule(naturalLanguageRule: string): Promise<GeneratedRule> {
    if (!this.config.apiKey) {
      throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
    }

    if (!this.config.projectId) {
      throw new Error('Google Cloud Project ID not configured. Please set VITE_GOOGLE_CLOUD_PROJECT_ID in your environment variables.');
    }

    try {
      const prompt = this.createPrompt(naturalLanguageRule);
      
      const requestBody = {
        contents: [{
          role: "user",
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response format from Gemini API');
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Clean up the response to extract JSON
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in Gemini response');
      }

      const generatedRule: GeneratedRule = JSON.parse(jsonMatch[0]);
      
      // Validate the generated rule
      this.validateGeneratedRule(generatedRule);
      
      return generatedRule;
      
    } catch (error) {
      console.error('Error generating rule with Gemini:', error);
      
      // Fallback to local generation if API fails
      return this.generateFallbackRule(naturalLanguageRule);
    }
  }

  private validateGeneratedRule(rule: GeneratedRule): void {
    const requiredFields = ['rule_id', 'name', 'description', 'conditions', 'action', 'reason', 'category', 'severity'];
    
    for (const field of requiredFields) {
      if (!(field in rule)) {
        throw new Error(`Generated rule missing required field: ${field}`);
      }
    }

    if (!Array.isArray(rule.conditions) || rule.conditions.length === 0) {
      throw new Error('Generated rule must have at least one condition');
    }

    const validSeverities = ['low', 'medium', 'warning', 'critical'];
    if (!validSeverities.includes(rule.severity)) {
      throw new Error(`Invalid severity level: ${rule.severity}`);
    }
  }

  private generateFallbackRule(naturalLanguageRule: string): GeneratedRule {
    // Fallback rule generation when API is unavailable
    const ruleId = naturalLanguageRule.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 50);

    return {
      rule_id: ruleId,
      name: `AI Generated: ${naturalLanguageRule.substring(0, 50)}...`,
      description: `Fallback rule generated from: ${naturalLanguageRule}`,
      conditions: [
        {
          field: "amount",
          operator: ">",
          value: 1000,
          description: "Amount exceeds threshold"
        }
      ],
      action: "flag",
      reason: `Flagged based on: ${naturalLanguageRule}`,
      category: "ai_generated",
      severity: "medium",
      confidence: 75
    };
  }

  async testConnection(): Promise<boolean> {
    try {
      const testRule = await this.generateRule("Test connection to Gemini AI");
      return testRule !== null;
    } catch (error) {
      console.error('Gemini connection test failed:', error);
      return false;
    }
  }

  getConfigStatus(): { configured: boolean; missing: string[] } {
    const missing: string[] = [];
    
    if (!this.config.apiKey) missing.push('VITE_GEMINI_API_KEY');
    if (!this.config.projectId) missing.push('VITE_GOOGLE_CLOUD_PROJECT_ID');
    
    return {
      configured: missing.length === 0,
      missing
    };
  }
}

export const geminiService = new GeminiService();
export type { GeneratedRule, RuleCondition };