export interface BaseLetterContent {
  title: string;
  contents: string;
}

export interface HistoryItem extends BaseLetterContent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
