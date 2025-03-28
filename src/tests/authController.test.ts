import { signUp, singIn } from '../controllers/auth.controller';
import { createUser, findUserByEmail } from '../services/auth.service';
import { passwordMatch } from '../utils/errors/security';

jest.mock('../services/auth.service');
jest.mock('../utils/errors/security');
jest.mock('../utils/jwt', () => ({
  jwtSign: jest.fn(() => 'mockedToken'),
  jwtNumericDate: jest.fn(() => Date.now()),
}));

describe('Auth Controller Tests', () => {
  const mockUser = {
    _id: '507f1f77bcf86cd799439011',
    email: 'test@example.com',
    password: 'hashedpassword',
    first_name: 'Test',
    last_name: 'User',
  };

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Register a new user successfully', async () => {
    (createUser as jest.Mock).mockResolvedValue(mockUser);

    const req = { body: { email: 'test@example.com', password: 'password', first_name: 'Test', last_name: 'User' } };
    const res = mockResponse();
    const next = jest.fn();

    await signUp(req as any, res as any, next as any);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'User added successfully !!',
      })
    );
  });

  test('Registration error (Duplicate Email)', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);

    const req = { body: { email: 'test@example.com', password: 'password', first_name: 'Test', last_name: 'User' } };
    const res = mockResponse();
    const next = jest.fn();

    await signUp(req as any, res as any, next as any);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'User already exists',
      })
    );
  });

  test('Login successfully', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (passwordMatch as jest.Mock).mockResolvedValue(true);

    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = mockResponse();
    const next = jest.fn();


    await singIn(req as any, res as any, next as any);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'SignIn successfully !!',
        data: expect.objectContaining({ token: 'mockedToken' }),
      })
    );
  });

  test('Login with invalid credentials (User Not Found)', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue(null);

    const req = { body: { email: 'wrong@example.com', password: 'password' } };
    const res = mockResponse();
    const next = jest.fn();
    
    await singIn(req as any, res as any, next as any);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Incorrect email or password',
      })
    );
  });

  test('Login with invalid credentials (Wrong Password)', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (passwordMatch as jest.Mock).mockResolvedValue(false);

    const req = { body: { email: 'test@example.com', password: 'wrongpassword' } };
    const res = mockResponse();
    const next = jest.fn();


    await singIn(req as any, res as any, next as any);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Incorrect email or password',
      })
    );
  });
});
