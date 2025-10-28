import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import MathOperations from './components/MathOperation/MathOperations';

const getResultText = () => {
  return screen.getByText((content, element) => {
    return element.tagName.toLowerCase() === 'p' && content.startsWith('Result:');
  });
};

describe('Kiểm thử Component tính toán (MathOperations)', () => {

  // Test case for Addition
  test('Thực hiện phép cộng: 5 + 3 = 8', () => {
    const num1 = 5;
    const num2 = 3;
    const expected = 8;
    const operation = 'Add';

    reporter.description(`
      Kịch bản này kiểm tra chức năng **${operation}**.
      - **Input 1:** ${num1}
      - **Input 2:** ${num2}
      - **Kết quả mong muốn:** ${expected}
    `);
    reporter.story(`JIRA-TICKET-123 - Chức năng ${operation}`);
    reporter.severity("critical");

    render(<MathOperations />);

    reporter.startStep("Nhập dữ liệu đầu vào");
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: num1.toString() } });
    fireEvent.change(inputs[1], { target: { value: num2.toString() } });
    reporter.addAttachment("Dữ liệu đã nhập", `Số thứ nhất: ${num1}, Số thứ hai: ${num2}`, "text/plain");
    reporter.endStep();

    reporter.startStep("Thực hiện phép tính");
    const operationButton = screen.getByText(operation);
    fireEvent.click(operationButton);
    reporter.endStep();

    reporter.startStep("Kiểm tra kết quả hiển thị");
    const resultText = getResultText();
    expect(resultText).toHaveTextContent(`Result: ${expected}`);
    reporter.addAttachment("Kết quả thực tế", resultText.textContent, "text/plain");
    reporter.endStep();
  });

  // Test case for Subtraction
  test('Thực hiện phép trừ: -10 - 4 = -14', () => {
    const num1 = -10;
    const num2 = 4;
    const expected = -14;
    const operation = 'Subtract';

    reporter.description(`
      Kịch bản này kiểm tra chức năng **${operation}**.
      - **Input 1:** ${num1}
      - **Input 2:** ${num2}
      - **Kết quả mong muốn:** ${expected}
    `);
    reporter.story(`JIRA-TICKET-124 - Chức năng ${operation}`);
    reporter.severity("critical");

    render(<MathOperations />);

    reporter.startStep("Nhập dữ liệu đầu vào");
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: num1.toString() } });
    fireEvent.change(inputs[1], { target: { value: num2.toString() } });
    reporter.addAttachment("Dữ liệu đã nhập", `Số thứ nhất: ${num1}, Số thứ hai: ${num2}`, "text/plain");
    reporter.endStep();

    reporter.startStep("Thực hiện phép tính");
    const operationButton = screen.getByText(operation);
    fireEvent.click(operationButton);
    reporter.endStep();

    reporter.startStep("Kiểm tra kết quả hiển thị");
    const resultText = getResultText();
    expect(resultText).toHaveTextContent(`Result: ${expected}`);
    reporter.addAttachment("Kết quả thực tế", resultText.textContent, "text/plain");
    reporter.endStep();
  });

  // Test case for Multiplication
  test('Thực hiện phép nhân: 6 * 7 = 42', () => {
    const num1 = 6;
    const num2 = 7;
    const expected = 42;
    const operation = 'Multiply';

    reporter.description(`
      Kịch bản này kiểm tra chức năng **${operation}**.
      - **Input 1:** ${num1}
      - **Input 2:** ${num2}
      - **Kết quả mong muốn:** ${expected}
    `);
    reporter.story(`JIRA-TICKET-125 - Chức năng ${operation}`);
    reporter.severity("critical");

    render(<MathOperations />);

    reporter.startStep("Nhập dữ liệu đầu vào");
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: num1.toString() } });
    fireEvent.change(inputs[1], { target: { value: num2.toString() } });
    reporter.addAttachment("Dữ liệu đã nhập", `Số thứ nhất: ${num1}, Số thứ hai: ${num2}`, "text/plain");
    reporter.endStep();

    reporter.startStep("Thực hiện phép tính");
    const operationButton = screen.getByText(operation);
    fireEvent.click(operationButton);
    reporter.endStep();

    reporter.startStep("Kiểm tra kết quả hiển thị");
    const resultText = getResultText();
    expect(resultText).toHaveTextContent(`Result: ${expected}`);
    reporter.addAttachment("Kết quả thực tế", resultText.textContent, "text/plain");
    reporter.endStep();
  });

  // Test case for Division
  test('Thực hiện phép chia: 15 / 3 = 5', () => {
    const num1 = 15;
    const num2 = 3;
    const expected = 5;
    const operation = 'Divide';

    reporter.description(`
      Kịch bản này kiểm tra chức năng **${operation}**.
      - **Input 1:** ${num1}
      - **Input 2:** ${num2}
      - **Kết quả mong muốn:** ${expected}
    `);
    reporter.story(`JIRA-TICKET-126 - Chức năng ${operation}`);
    reporter.severity("critical");

    render(<MathOperations />);

    reporter.startStep("Nhập dữ liệu đầu vào");
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: num1.toString() } });
    fireEvent.change(inputs[1], { target: { value: num2.toString() } });
    reporter.addAttachment("Dữ liệu đã nhập", `Số thứ nhất: ${num1}, Số thứ hai: ${num2}`, "text/plain");
    reporter.endStep();

    reporter.startStep("Thực hiện phép tính");
    const operationButton = screen.getByText(operation);
    fireEvent.click(operationButton);
    reporter.endStep();

    reporter.startStep("Kiểm tra kết quả hiển thị");
    const resultText = getResultText();
    expect(resultText).toHaveTextContent(`Result: ${expected}`);
    reporter.addAttachment("Kết quả thực tế", resultText.textContent, "text/plain");
    reporter.endStep();
  });

  // Test case for Division by Zero
  test('Xử lý chia cho 0: 10 / 0', () => {
    const num1 = 10;
    const num2 = 0;
    const expected = 'Error: Division by zero';
    const operation = 'Divide';

    reporter.description(`
      Kịch bản này kiểm tra xử lý lỗi khi **${operation} by zero**.
      - **Input 1:** ${num1}
      - **Input 2:** ${num2}
      - **Kết quả mong muốn:** ${expected}
    `);
    reporter.story(`JIRA-TICKET-127 - Xử lý lỗi ${operation}`);
    reporter.severity("blocker"); // Mark as blocker severity

    render(<MathOperations />);

    reporter.startStep("Nhập dữ liệu đầu vào");
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: num1.toString() } });
    fireEvent.change(inputs[1], { target: { value: num2.toString() } });
    reporter.addAttachment("Dữ liệu đã nhập", `Số thứ nhất: ${num1}, Số thứ hai: ${num2}`, "text/plain");
    reporter.endStep();

    reporter.startStep("Thực hiện phép tính");
    const operationButton = screen.getByText(operation);
    fireEvent.click(operationButton);
    reporter.endStep();

    reporter.startStep("Kiểm tra kết quả hiển thị");
    const resultText = getResultText();
    expect(resultText).toHaveTextContent(`Result: ${expected}`);
    reporter.addAttachment("Kết quả thực tế", resultText.textContent, "text/plain");
    reporter.endStep();
  });

   // Test case for Zero divided by a number
  test('Thực hiện phép chia: 0 / 5 = 0', () => {
    const num1 = 0;
    const num2 = 5;
    const expected = 0;
    const operation = 'Divide';

    reporter.description(`
      Kịch bản này kiểm tra chức năng **${operation}** khi số bị chia là 0.
      - **Input 1:** ${num1}
      - **Input 2:** ${num2}
      - **Kết quả mong muốn:** ${expected}
    `);
    reporter.story(`JIRA-TICKET-128 - Chức năng ${operation}`);
    reporter.severity("normal"); // Mark as normal severity

    render(<MathOperations />);

    reporter.startStep("Nhập dữ liệu đầu vào");
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: num1.toString() } });
    fireEvent.change(inputs[1], { target: { value: num2.toString() } });
    reporter.addAttachment("Dữ liệu đã nhập", `Số thứ nhất: ${num1}, Số thứ hai: ${num2}`, "text/plain");
    reporter.endStep();

    reporter.startStep("Thực hiện phép tính");
    const operationButton = screen.getByText(operation);
    fireEvent.click(operationButton);
    reporter.endStep();

    reporter.startStep("Kiểm tra kết quả hiển thị");
    const resultText = getResultText();
    expect(resultText).toHaveTextContent(`Result: ${expected}`);
    reporter.addAttachment("Kết quả thực tế", resultText.textContent, "text/plain");
    reporter.endStep();
  });

});

