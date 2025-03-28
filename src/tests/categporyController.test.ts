import { createCategory, getCategoryById } from '../controllers/category.controller';
import { createCategory as createCategoryService, getCategoryById as getCategoryByIdService } from '../services/category.service';

jest.mock('../services/category.service');
jest.mock('../utils/errors/security');
jest.mock('../utils/jwt', () => ({
  jwtSign: jest.fn(() => 'mockedToken'),
  jwtVerify: jest.fn(() => ({ sub: { id: 'user123' } })), 
  jwtNumericDate: jest.fn(() => Date.now()),
}));

describe('Category Controller Tests', () => {
  const mockCategory = { _id: '123', name: 'Electronics' };

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Create category successfully (Authorized)', async () => {
    (createCategoryService as jest.Mock).mockResolvedValue(mockCategory);
    
    const req = {
      headers: { Authorization: 'Bearer mockedToken' }, 
      body: { name: 'Electronics' },
    };
    const res = mockResponse();
    const next = jest.fn();

    await createCategory(req as any, res as any, next as any);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Category created successfully!',
        data: { category: mockCategory },
        code: 201, 
        success: true
      })
    );
  });

  test('Create category failure (Duplicate)', async () => {
    (createCategoryService as jest.Mock).mockRejectedValue(new Error('Duplicate key error'));

    const req = {
      headers: { Authorization: 'Bearer mockedToken' }, 
      body: { name: 'Electronics' },
    };
    const res = mockResponse();
    const next = jest.fn();

    await createCategory(req as any, res as any, next as any);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  test('Get category by ID successfully (Authorized)', async () => {
    (getCategoryByIdService as jest.Mock).mockResolvedValue(mockCategory);

    const req = {
      headers: { Authorization: 'Bearer mockedToken' },
      params: { id: '123' },
    };
    const res = mockResponse();
    const next = jest.fn();

    await getCategoryById(req as any, res as any, next as any);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Category retrieved successfully!',
        data: { category: mockCategory },
        code: 200, 
        success: true
      })
    );
  });

  test('Get category by ID (Not Found)', async () => {
    (getCategoryByIdService as jest.Mock).mockResolvedValue(null);

    const req = {
      headers: { Authorization: 'Bearer mockedToken' }, 
      params: { id: '999' },
    };
    const res = mockResponse();
    const next = jest.fn();

    await getCategoryById(req as any, res as any, next as any);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Category not found' })
    );
  });

  test('Unauthorized request (No Token)', async () => {
    const req = {
      headers: {}, 
      body: { name: 'Electronics' },
    };
    const res = mockResponse();
    const next = jest.fn();

    await createCategory(req as any, res as any, next as any);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  test('Unauthorized request (Invalid Token)', async () => {
    jest.mock('../utils/jwt', () => ({
      jwtVerify: jest.fn(() => { throw new Error('Invalid token'); }),
    }));

    const req = {
      headers: { Authorization: 'Bearer invalidToken' },
      body: { name: 'Electronics' },
    };
    const res = mockResponse();
    const next = jest.fn();

    await createCategory(req as any, res as any, next as any);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
