export const generateRandomCode = (): string => {
  return Math.random().toString(36).substr(2, 6); // Пример: случайная строка из 6 символов
};
