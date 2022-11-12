export default class Repo {
  public _children = new Map();
  public parent: Repo | null = null;
  public _id = Math.floor(Math.random() * Date.now());
  public _name: string;
  private _url: string;
  public content: any;

  constructor(username: string, name: string) {
    if (!name || typeof name !== 'string') {
      throw new Error('Cannot change name. Name must be a non-empty String');
    }

    this._name = name;
    this._url = `https://api.github.com/repos/${username}/${name}/contents`;
  }

  async init(cb: any) {
    const response = await fetch(this._url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
      },
    });

    this.content = await response.json();
    cb.bind(this)();
  }

  public get identifier(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get children(): Array<any> {
    return Array.from(this._children.values());
  }

  public get parentNode(): any {
    return this.parent;
  }

  public set parentNode(newParent: any) {
    if (
      newParent !== this.parentNode &&
      (newParent === null || newParent instanceof Repo)
    ) {
      if (this.parent) {
        this.parent.removeChildNode(this);
      }

      this.parent = newParent;

      if (newParent) {
        newParent.appendChildNode(this);
      }
    }
  }

  public get childrenCount(): number {
    return this._children.size;
  }



  public removeChildNode(needle: any) {
    if (!this.hasChildNode(needle)) return;
    // console.log(`should remove: `, needle, 'from ', this.name);
    let removedNode;

    if (needle instanceof Repo) {
      this._children.delete(needle.identifier);
    } else {
      for (let child of this.children) {
        // console.log(child);
        if (child.name === needle || child.identifier === needle) {
          console.log('identitfier to remove: ', child.identifier);
          this._children.delete(child.identifier);
          removedNode = child;
          break;
        }
      }
    }

    if (removedNode) {
      removedNode.parentNode = null;
    }
  }

  public appendChildNode(node: Repo) {
    if (!(node instanceof Repo) || this.hasChildNode(node)) return;

    if (node === this) throw new Error('Node cannot contain itself');

    let parent = this.parentNode;
    while (parent !== null) {
      if (parent === node)
        throw new Error('Node cannot contain one of its ancestors');

      parent = parent.parentNode;
    }

    this._children.set(node.identifier, node);
    node.parent = this;
  }

  public hasChildNode(needle: any): boolean {
    if (needle instanceof Repo) {
      return this._children.has(needle.identifier);
    }

    for (let child of this.children) {
      if (child.name === needle || this.identifier === needle) {
        return true;
      }
    }

    return false;
  }

  public getChildNode(nameOrId: any): any {
    for (let child of this.children) {
      if (child.name === nameOrId || this.identifier === nameOrId) {
        return child;
      }
    }
    return null;
  }

  private getRepoString = (node: Repo, spaceCount: number): string => {
    let str = '\n';

    node._children.forEach((child) => {
      str += `${' '.repeat(spaceCount)}${child._name}${this.getRepoString(
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
