// ==================== Register ====================

export interface RegisterRequest 
{
 fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  howDidYouHear: string;
}

export interface RegisterUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "CUSTOMER";
  createdAt: string;
}

export interface RegisterResponse {
  message: string;
  user: RegisterUser;
}


// ==================== Login ====================

export interface LoginRequest
{
    phone: string;
    password: string;
}

export interface LoginUser {
  id: string;
  fullName: string;
  phone: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: LoginUser;
}


// ==================== Forgot Password ====================

export interface ForgetPasswordRequest {
  phone: string;
}

export interface ForgetPasswordResponse {
  message: string;
  otp: string;
}

// ==================== Verify OTP ====================

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  resetToken: string;
}

// ==================== Reset Password ====================

export interface ResetPasswordRequest {
  resetToken: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}