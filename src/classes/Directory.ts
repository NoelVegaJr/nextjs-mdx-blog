export class RepoDirectory {
  private _parent: RepoDirectory | null = null;
  private _id: number;
  private _children = new Map();
  public name: string;
  public username: string;
  public type = 'Dir';

  constructor(username: string, name: string) {
    this.username = username;
    this.name = name;
    this._id = Math.random() * Date.now();
  }

  private get identifier(): number {
    return this._id;
  }

  public get children(): Array<any> {
    return Array.from(this._children.values());
  }

  public get parentNode(): RepoDirectory | null {
    return this._parent;
  }

  public set parentNode(node: RepoDirectory | null) {
    this._parent = node;
  }

  public createChildItem(item: RepoDirectory) {
    const newItem = n;
  }

  public hasChildNode(needle: RepoDirectory | string | number): boolean {
    if (needle instanceof RepoDirectory) {
      return this._children.has(needle.identifier);
    }

    for (let child of this._children.values()) {
      if (child.name === needle || child.identifier === needle) {
        return true;
      }
    }

    return false;
  }

  private getRepoString = (node: RepoDirectory, spaceCount: number): string => {
    let str = '\n';

    node._children.forEach((child) => {
      str += `${' '.repeat(spaceCount)} ${child._name}${this.getRepoString(
        child,
        spaceCount + 2
      )}`;
    });

    return str;
  };

  public print() {
    console.log(`\n${this.name}${this.getRepoString(this, 2)}`);
  }
}
