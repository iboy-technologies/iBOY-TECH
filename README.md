# iBOY-TECH

Responsive static landing page for iBOY-TECH, a software, electronics repair, and intelligent systems engineering studio.

Open `index.html` directly or serve this dependency-free site with:

```bash
python -m http.server 8000
```

Visual media is kept in `assets/media/` with descriptive filenames. The page uses
the supplied GIFs as animated image media (not video), plus responsive WebP/JPG
panels with lazy loading. A lightweight scroll-linked parallax effect enhances
the hero and supporting media and automatically disables when reduced motion is
preferred.

The supplied 3D geometry asset is stored at
`assets/media/technology-geometry.avif` and is used as the body background with
layered contrast tinting. The existing CSS-only neuromorphic texture remains the
fallback for browsers that cannot decode AVIF.
