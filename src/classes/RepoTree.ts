import { formatBase64 } from '../utils/formatBase64';

export type RepoItemType = 'file' | 'dir';

export class RepoItem {
  private _parent: RepoDir | null = null;
  private _type: 'file' | 'dir' | null = null;
  private _url: string;
  private _id: number;

  constructor(type: RepoItemType, url: string) {
    this._type = type;
    this._url = url;
    this._id = Math.random() * Date.now();
  }

  public get identifier(): number {
    return this._id;
  }

  public get url(): string {
    return this._url;
  }

  public get parent(): RepoDir | null {
    return this._parent;
  }

  public set parent(newParent: any) {
    if (
      newParent !== this._parent &&
      (newParent === null || newParent instanceof RepoDir)
    ) {
      this._parent = newParent;

      if (newParent) {
        newParent.appendChildNode(this);
      }
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
  private _items = new Map();

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
    return this._items.size;
  }

  public get items(): Array<RepoItem> {
    return Array.from(this._items.values());
  }

  public appendItem(item: RepoItem) {
    if (!(item instanceof RepoItem)) return;
    if (item === this) throw new Error('Node cannot contain itself');

    let parent = this.parent;

    while (parent !== null) {
      if (parent === item) {
        throw new Error('Item cannot contain one of its ancestors');
      }
      parent = parent.parent;
    }
    this._items.set(item.identifier, item);
  }
}

export class RepoTree {}
