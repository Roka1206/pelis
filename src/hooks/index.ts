import { defineStore } from 'pinia'

export interface IComment {
  name: string,
  comment: string;
  points: number;
}

export const useStore = defineStore('main', {
  state: () => {
    return {
      comments: [] as IComment[],
    }
  },
  actions: {
    addComment(comment: IComment) {
      this.comments.push(comment)
    },
  },
  getters: {
    comments: (state) => state.comments,
  }
})