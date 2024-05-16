import { Test, TestingModule } from '@nestjs/testing';
import { ButtonService } from './button.service';

describe('ButtonService', () => {
  let service: ButtonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ButtonService],
    }).compile();

    service = module.get<ButtonService>(ButtonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return [0, 0] when n is 0', () => {
    expect(service.count_symbols(0)).toEqual([0, 0]);
  });
  it('should return [0, 1] when n is 1', () => {
    expect(service.count_symbols(1)).toEqual([0, 2]);
  });

  it('should return [2, 2] when n is 2', () => {
    expect(service.count_symbols(2)).toEqual([2, 2]);
  });

  it('should return [2, 6] when n is 3', () => {
    expect(service.count_symbols(3)).toEqual([2, 6]);
  });

  it('should return [6, 10] when n is 4', () => {
    expect(service.count_symbols(4)).toEqual([6, 10]);
  });
});
