export class Vector2 {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vec: Vector2) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    addCopy(vec: Vector2) {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    subtractCopy(vec: Vector2) {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    scale(scale: number) {
        this.x *= scale;
        this.y *= scale;
        return this;
    }

    divide(scale: number) {
        if (scale == 0) {
            return;
        }
        this.x /= scale;
        this.y /= scale;
        return this;
    }

    scaleCopy(scale: number) {
        return new Vector2(this.x * scale, this.y * scale);
    }

    normalize() {
        let length = this.length;
        if (length != 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }

    normalizeCopy() {
        let v = new Vector2(this.x, this.y);
        v.normalize();
        return v;
    }

    dot(vec: Vector2) {
        return this.x * vec.x + this.y * vec.y;
    }

    get sqrLength() {
        return this.x * this.x + this.y * this.y;
    }

    get length() {
        return Math.abs(Math.sqrt(this.x * this.x + this.y * this.y));
    }
}