export type ResponseJSON = (response: {
    data?: any;
    message?: string;
    code?: number;
  }) => void;