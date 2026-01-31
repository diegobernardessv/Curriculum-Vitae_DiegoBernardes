import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
CSS_IN = BASE_DIR / "static" / "css" / "style.css"
JS_IN = BASE_DIR / "static" / "js" / "main.js"
CSS_OUT = BASE_DIR / "static" / "css" / "style.min.css"
JS_OUT = BASE_DIR / "static" / "js" / "main.min.js"


def minify_css(content: str) -> str:
    content = re.sub(r"/\*.*?\*/", "", content, flags=re.S)
    content = re.sub(r"\s+", " ", content)
    content = re.sub(r"\s*([{}:;,])\s*", r"\1", content)
    return content.strip()


def minify_js(content: str) -> str:
    content = re.sub(r"/\*.*?\*/", "", content, flags=re.S)
    content = re.sub(r"//.*", "", content)
    content = re.sub(r"\s+", " ", content)
    content = re.sub(r"\s*([{}();,:=<>+\-*/])\s*", r"\1", content)
    return content.strip()


def main() -> None:
    if not CSS_IN.exists() or not JS_IN.exists():
        raise FileNotFoundError("Arquivos de origem não encontrados.")

    CSS_OUT.write_text(minify_css(CSS_IN.read_text(encoding="utf-8")), encoding="utf-8")
    JS_OUT.write_text(minify_js(JS_IN.read_text(encoding="utf-8")), encoding="utf-8")

    print("Minificação concluída:")
    print(f"- {CSS_OUT}")
    print(f"- {JS_OUT}")


if __name__ == "__main__":
    main()
