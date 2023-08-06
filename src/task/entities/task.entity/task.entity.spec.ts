import { TaskEntity } from './task.entity';

describe('TaskEntity', () => {
  it('should be defined', () => {
    expect(new TaskEntity()).toBeDefined();
  });
});
