import { Employee } from './employee.model';

describe('Employee model', () => {
  it('should create an instance', () => {
    expect(new Employee()).toBeTruthy();
  });
});
