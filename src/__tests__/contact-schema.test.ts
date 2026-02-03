import { createContactSchema, subjectOptions } from '@/lib/contact-schema';

// Mock translation function
const mockT = (key: string) => {
  const translations: Record<string, string> = {
    'contact.errors.name.min': 'Name must be at least 2 characters',
    'contact.errors.name.max': 'Name must be less than 100 characters',
    'contact.errors.email.invalid': 'Invalid email address',
    'contact.errors.subject.required': 'Subject is required',
    'contact.errors.message.min': 'Message must be at least 20 characters',
    'contact.errors.message.max': 'Message must be less than 5000 characters',
  };
  return translations[key] || key;
};

describe('createContactSchema', () => {
  const schema = createContactSchema(mockT);

  describe('name field', () => {
    it('should accept valid names', () => {
      const result = schema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'general',
        message: 'This is a test message with enough characters',
      });
      expect(result.success).toBe(true);
    });

    it('should reject names that are too short', () => {
      const result = schema.safeParse({
        name: 'J',
        email: 'john@example.com',
        subject: 'general',
        message: 'This is a test message with enough characters',
      });
      expect(result.success).toBe(false);
    });

    it('should reject names that are too long', () => {
      const result = schema.safeParse({
        name: 'a'.repeat(101),
        email: 'john@example.com',
        subject: 'general',
        message: 'This is a test message with enough characters',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('email field', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user+tag@domain.co',
        'name.lastname@company.org',
      ];

      validEmails.forEach((email) => {
        const result = schema.safeParse({
          name: 'John Doe',
          email,
          subject: 'general',
          message: 'This is a test message with enough characters',
        });
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
      ];

      invalidEmails.forEach((email) => {
        const result = schema.safeParse({
          name: 'John Doe',
          email,
          subject: 'general',
          message: 'This is a test message with enough characters',
        });
        expect(result.success).toBe(false);
      });
    });
  });

  describe('subject field', () => {
    it('should accept valid subject options', () => {
      subjectOptions.forEach((subject) => {
        const result = schema.safeParse({
          name: 'John Doe',
          email: 'john@example.com',
          subject,
          message: 'This is a test message with enough characters',
        });
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid subject options', () => {
      const result = schema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'invalid',
        message: 'This is a test message with enough characters',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('message field', () => {
    it('should accept messages of valid length', () => {
      const result = schema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'general',
        message: 'This is a test message with enough characters to pass validation',
      });
      expect(result.success).toBe(true);
    });

    it('should reject messages that are too short', () => {
      const result = schema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'general',
        message: 'Too short',
      });
      expect(result.success).toBe(false);
    });

    it('should reject messages that are too long', () => {
      const result = schema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'general',
        message: 'a'.repeat(5001),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('optional fields', () => {
    it('should accept newsletter field as optional', () => {
      const result = schema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'general',
        message: 'This is a test message with enough characters',
        newsletter: true,
      });
      expect(result.success).toBe(true);
    });

    it('should accept website field as optional (honeypot)', () => {
      const result = schema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'general',
        message: 'This is a test message with enough characters',
        website: 'http://spam.com',
      });
      expect(result.success).toBe(true);
    });
  });
});
