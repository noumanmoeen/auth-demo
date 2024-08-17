export interface SignUpFormProps {
    title ?: string
}
export interface PasswordStrength {
    minLength: boolean;
    hasLetter: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  }