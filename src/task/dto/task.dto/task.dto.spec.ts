import { TaskDto } from './task.dto';

describe('TaskDto', () => {
  it('should be defined', () => {
    expect(new TaskDto()).toBeDefined();
  });
});
