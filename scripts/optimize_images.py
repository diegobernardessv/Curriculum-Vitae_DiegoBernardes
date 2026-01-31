from pathlib import Path

from PIL import Image

BASE_DIR = Path(__file__).resolve().parents[1]
IMG_PATH = BASE_DIR / "static" / "img" / "fotoperfil.jpg"


def optimize_jpeg(path: Path, quality: int = 82) -> None:
    if not path.exists():
        raise FileNotFoundError(f"Arquivo não encontrado: {path}")

    before_size = path.stat().st_size

    with Image.open(path) as img:
        img = img.convert("RGB")
        img.save(
            path,
            format="JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
        )

    after_size = path.stat().st_size
    reduction = ((before_size - after_size) / before_size) * 100 if before_size else 0

    print("Otimização concluída:")
    print(f"- Arquivo: {path}")
    print(f"- Antes: {before_size / 1024:.1f} KB")
    print(f"- Depois: {after_size / 1024:.1f} KB")
    print(f"- Redução: {reduction:.1f}%")


def main() -> None:
    optimize_jpeg(IMG_PATH)


if __name__ == "__main__":
    main()
