import { formatBase64 } from '../utils/formatBase64';
import { v4 as uuidv4 } from 'uuid';

export type RepoItemType = 'file' | 'dir' | null;

export class RepoItem {
  private _parent: string | null = null;
  public type: 'file' | 'dir' | null = null;
  public url: string;
  public name: string;
  private _id: string;

  constructor(type: RepoItemType, url: string) {
    this.type = type;
    this.url = url;
    this.name = url.split('/')[url.split('/').length - 1];
    this._id = uuidv4();
  }

  public get identifier(): string {
    return this._id;
  }

  public get parent(): string | null {
    return this._parent;
  }

  public set parent(newParent: string | null) {
    console.log('begin setting parent: ', newParent);
    console.log(newParent !== this.parent);
    console.log(newParent === null);
    if (
      newParent !== this.parent &&
      (newParent === null || typeof newParent === 'string')
    ) {
      // if (this.parent) {
      //   this.parent.removeItem(this);
      // }
      this._parent = newParent;
      console.log('parent: ', this._parent);

      // if (newParent) {
      //   console.log('setting parent');
      //   newParent.appendItem(this);
      // }
    }
  }
}

export class RepoFile extends RepoItem {
  private _content: any;
  constructor(url: string) {
    super('file', url);
  }

  async getContent() {
    const response = await fetch(this.url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer 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`,
      },
    });

    const data = await response.json();

    return formatBase64(data.content).split('\n');
  }
}

export class RepoDir extends RepoItem {
  public items: RepoItem[] = [];

  constructor(url: string) {
    super('dir', url);
  }

  async getContent() {
    const response = await fetch(this.url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer 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`,
      },
    });

    const data = await response.json();
    return data;
  }

  public get itemCount(): number {
    return this.items.length;
  }

  public appendItem(item: RepoItem) {
    // must be a repo item
    if (!(item instanceof RepoItem || this.hasItem(item))) return;
    if (item === this) throw new Error('Node cannot contain itself');

    let parent = this.parent;

    // traverse your way up to root
    // while (parent !== null) {
    //   if (parent === item.parent) {
    //     throw new Error('Item cannot contain one of its ancestors');
    //   }
    //   // parent = parent.parent;
    // }
    this.items.push(item);
    item.parent = this.url;
  }

  public removeItem(repoItem: RepoItem) {
    this.items = this.items.filter((item) => item !== repoItem);
  }

  public hasItem(needle: any): boolean {
    if (needle instanceof RepoItem) {
      const foundItem = this.items.map(
        (item) => item.identifier === needle.identifier
      );
      if (foundItem) return true;
      return false;
    }

    for (let item of this.items) {
      if (item.url === needle || this.identifier === needle) {
        return true;
      }
    }

    return false;
  }
}

export class RepoTree {}
