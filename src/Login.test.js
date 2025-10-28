import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './components/Login/Login';

// Mock function cho onLoginSuccess
const mockLoginSuccess = jest.fn();

const getInputs = () => {
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Mật khẩu/i);
  const captchaInput = screen.getByLabelText(/Xác minh/i);
  const loginButton = screen.getByRole('button', { name: /Đăng nhập/i });
  const captchaQuestionElement = screen.getByText(/=/i); 
  return { emailInput, passwordInput, captchaInput, loginButton, captchaQuestionElement };
};

// Hàm helper để giải captcha tự động
const solveCaptcha = (question) => {
  // Trích xuất số và toán tử từ chuỗi câu hỏi (ví dụ: "5 + 3 = ?")
  const match = question.match(/(\d+)\s*([\+\-])\s*(\d+)/);
  if (!match) return NaN; // Không tìm thấy phép toán hợp lệ

  const num1 = parseInt(match[1], 10);
  const operator = match[2];
  const num2 = parseInt(match[3], 10);

  if (operator === '+') {
    return num1 + num2;
  } else if (operator === '-') {
    return num1 - num2;
  }
  return NaN; 
};

describe('Kiểm thử Component Đăng nhập (Login)', () => {
  // Reset mock function trước mỗi test
  beforeEach(() => {
    mockLoginSuccess.mockClear();
  });

  test('Đăng nhập thành công với thông tin hợp lệ', async () => {
    reporter.description(`
      Kịch bản này kiểm tra luồng đăng nhập thành công:
      - Email đúng
      - Mật khẩu đúng
      - Captcha đúng
      - Mong muốn: Gọi hàm onLoginSuccess.
    `);
    reporter.story('JIRA-LOGIN-001 - Đăng nhập thành công');
    reporter.severity('critical');

    render(<Login onLoginSuccess={mockLoginSuccess} />);

    const { emailInput, passwordInput, captchaInput, loginButton, captchaQuestionElement } = getInputs();
    const captchaQuestion = captchaQuestionElement.textContent || '';
    const correctAnswer = solveCaptcha(captchaQuestion);

    reporter.startStep("Nhập thông tin đăng nhập và captcha");
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(captchaInput, { target: { value: correctAnswer.toString() } });
    reporter.addAttachment("Thông tin nhập", `Email: test@example.com, Pass: password123, Captcha: ${correctAnswer}`, "text/plain");
    reporter.endStep();

    reporter.startStep("Nhấn nút Đăng nhập");
    fireEvent.click(loginButton);
    reporter.endStep();

    reporter.startStep("Kiểm tra kết quả");
    await waitFor(() => {
      expect(mockLoginSuccess).toHaveBeenCalledTimes(1); // Kiểm tra hàm callback được gọi
    });

    expect(screen.queryByText(/không chính xác|không đúng|Vui lòng nhập/i)).not.toBeInTheDocument();
    reporter.endStep();
  });

  test('Đăng nhập thất bại do sai mật khẩu', async () => {
    reporter.description(`
      Kịch bản này kiểm tra luồng đăng nhập thất bại do sai mật khẩu:
      - Email đúng
      - Mật khẩu **sai**
      - Captcha đúng
      - Mong muốn: Hiển thị thông báo lỗi "Email hoặc mật khẩu không đúng." và không gọi onLoginSuccess.
    `);
    reporter.story('JIRA-LOGIN-002 - Sai mật khẩu');
    reporter.severity('normal');

    render(<Login onLoginSuccess={mockLoginSuccess} />);

    const { emailInput, passwordInput, captchaInput, loginButton, captchaQuestionElement } = getInputs();
    const captchaQuestion = captchaQuestionElement.textContent || '';
    const correctAnswer = solveCaptcha(captchaQuestion);

    reporter.startStep("Nhập thông tin đăng nhập và captcha (sai mật khẩu)");
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } }); // Sai mật khẩu
    fireEvent.change(captchaInput, { target: { value: correctAnswer.toString() } });
     reporter.addAttachment("Thông tin nhập", `Email: test@example.com, Pass: wrongpassword, Captcha: ${correctAnswer}`, "text/plain");
    reporter.endStep();

    reporter.startStep("Nhấn nút Đăng nhập");
    fireEvent.click(loginButton);
    reporter.endStep();

    reporter.startStep("Kiểm tra kết quả");
    // Đợi thông báo lỗi xuất hiện
    const errorMessage = await screen.findByText(/Email hoặc mật khẩu không đúng/i);
    expect(errorMessage).toBeInTheDocument();
    expect(mockLoginSuccess).not.toHaveBeenCalled(); // Hàm callback không được gọi
    reporter.addAttachment("Thông báo lỗi", errorMessage.textContent || "Không có lỗi", "text/plain");
    reporter.endStep();
  });

  test('Đăng nhập thất bại do sai captcha', async () => {
     reporter.description(`
      Kịch bản này kiểm tra luồng đăng nhập thất bại do sai captcha:
      - Email đúng
      - Mật khẩu đúng
      - Captcha **sai**
      - Mong muốn: Hiển thị thông báo lỗi "Kết quả xác minh không chính xác." và không gọi onLoginSuccess.
    `);
    reporter.story('JIRA-LOGIN-003 - Sai captcha');
    reporter.severity('normal');

    render(<Login onLoginSuccess={mockLoginSuccess} />);

    const { emailInput, passwordInput, captchaInput, loginButton, captchaQuestionElement } = getInputs();
    const captchaQuestion = captchaQuestionElement.textContent || '';
    const correctAnswer = solveCaptcha(captchaQuestion);
    const wrongAnswer = correctAnswer + 1; // Tạo câu trả lời sai

    reporter.startStep("Nhập thông tin đăng nhập và captcha (sai captcha)");
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(captchaInput, { target: { value: wrongAnswer.toString() } }); // Sai captcha
     reporter.addAttachment("Thông tin nhập", `Email: test@example.com, Pass: password123, Captcha: ${wrongAnswer}`, "text/plain");
    reporter.endStep();

    reporter.startStep("Nhấn nút Đăng nhập");
    fireEvent.click(loginButton);
    reporter.endStep();

    reporter.startStep("Kiểm tra kết quả");
    const errorMessage = await screen.findByText(/Kết quả xác minh không chính xác/i);
    expect(errorMessage).toBeInTheDocument();
    expect(mockLoginSuccess).not.toHaveBeenCalled();
     reporter.addAttachment("Thông báo lỗi", errorMessage.textContent || "Không có lỗi", "text/plain");
     // Kiểm tra xem captcha mới đã được tạo chưa (nâng cao, tùy chọn)
     const newCaptchaQuestion = screen.getByText(/=/i).textContent;
     expect(newCaptchaQuestion).not.toBe(captchaQuestion); // Câu hỏi captcha đã thay đổi
    reporter.endStep();
  });

   test('Hiển thị lỗi khi bỏ trống trường thông tin', async () => {
    reporter.description(`
      Kịch bản kiểm tra việc hiển thị lỗi khi người dùng không nhập đủ thông tin.
    `);
    reporter.story('JIRA-LOGIN-004 - Validate trường trống');
    reporter.severity('minor');

    render(<Login onLoginSuccess={mockLoginSuccess} />);

    const { loginButton } = getInputs();

    reporter.startStep("Nhấn nút Đăng nhập khi chưa nhập gì");
    fireEvent.click(loginButton);
    reporter.endStep();

    reporter.startStep("Kiểm tra thông báo lỗi");
    const errorMessage = await screen.findByText(/Vui lòng nhập đầy đủ thông tin/i);
    expect(errorMessage).toBeInTheDocument();
    expect(mockLoginSuccess).not.toHaveBeenCalled();
    reporter.addAttachment("Thông báo lỗi", errorMessage.textContent || "Không có lỗi", "text/plain");
    reporter.endStep();
  });

});
