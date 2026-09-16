export class UrlRegistry {
  private urls = new Set<string>();

  track(url: string): void {
    this.urls.add(url);
  }

  revoke(url: string | null | undefined): void {
    if (!url) return;
    if (this.urls.has(url)) {
      URL.revokeObjectURL(url);
      this.urls.delete(url);
    }
  }

  revokeAll(): void {
    this.urls.forEach((u) => URL.revokeObjectURL(u));
    this.urls.clear();
  }
}