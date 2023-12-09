export default interface ITask {
  name: string;
  category: string;
  pending: boolean;
}

export default interface INewTask {
  name: string;
  description: string;
  categoryId: string | number;
}
