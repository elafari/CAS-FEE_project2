export class DataProviderService {
  getDetails() {
    const resultPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Disease Diary');
      }, 1500);
    });
    return resultPromise;
  }
}
