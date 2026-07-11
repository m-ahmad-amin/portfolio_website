import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand, FaTimes } from "react-icons/fa";

function PreviewImage({ image, alt, expanded = false }) {
  const isMobile = image.size === "small";

  return (
    <div
      className={`mx-auto w-full overflow-hidden rounded-xl ${
        isMobile ? (expanded ? "max-w-[280px]" : "max-w-[220px]") : "max-w-full"
      }`}
    >
      <img
        src={image.src}
        alt={alt}
        className={`w-full object-contain object-top ${
          expanded ? "max-h-[70dvh]" : "h-auto"
        }`}
      />
    </div>
  );
}

function Lightbox({ images, index, onClose, onNavigate, projectTitle }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.stopImmediatePropagation();
        onNavigate(-1);
      }

      if (event.key === "ArrowRight") {
        event.stopImmediatePropagation();
        onNavigate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [onClose, onNavigate]);

  const image = images[index];
  const isMobile = image.size === "small";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <FaTimes size={16} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(-1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Previous image"
          >
            <FaChevronLeft size={14} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Next image"
          >
            <FaChevronRight size={14} />
          </button>
        </>
      )}

      <div
        className="flex w-full flex-col items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`flex w-full items-center justify-center ${
            isMobile ? "max-w-[280px]" : "max-w-5xl"
          }`}
        >
          <PreviewImage
            image={image}
            alt={`${projectTitle} screenshot ${index + 1}`}
            expanded
          />
        </div>

        <p className="mt-4 text-center text-sm font-poppins text-white/60">
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

export default function ProjectPreviewGallery({ images, projectTitle }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images?.length) {
    return null;
  }

  const selectedImage = images[selectedIndex];
  const isMobile = selectedImage.size === "small";

  const navigate = (direction) => {
    setSelectedIndex((current) => {
      const next = current + direction;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div
          className={`relative mx-auto w-full ${
            isMobile ? "max-w-[220px]" : "max-w-full"
          }`}
        >
          <PreviewImage
            image={selectedImage}
            alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-sm transition hover:bg-black/90"
                aria-label="Previous preview"
              >
                <FaChevronLeft size={12} />
              </button>

              <button
                type="button"
                onClick={() => navigate(1)}
                className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-sm transition hover:bg-black/90"
                aria-label="Next preview"
              >
                <FaChevronRight size={12} />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <p className="text-white/50 text-xs font-poppins">
            {selectedIndex + 1} of {images.length}
          </p>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-poppins text-white/90 transition hover:border-[#00f0ff] hover:text-[#00f0ff]"
          >
            <FaExpand size={11} /> Expand
          </button>
        </div>

        {images.length > 1 && (
          <div className="flex justify-center gap-3 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  selectedIndex === index
                    ? "border-[#00f0ff] shadow-lg shadow-[#00f0ff]/20"
                    : "border-white/10 opacity-70 hover:opacity-100"
                } ${image.size === "small" ? "w-14" : "w-24"}`}
              >
                <img
                  src={image.src}
                  alt={`${projectTitle} thumbnail ${index + 1}`}
                  className="w-full h-auto object-cover object-top"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          index={selectedIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={navigate}
          projectTitle={projectTitle}
        />
      )}
    </>
  );
}
