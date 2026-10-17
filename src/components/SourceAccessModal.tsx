import { ArrowUpRight, LockKeyhole, Mail, X } from "lucide-react";
import { useEffect } from "react";
import { site } from "../data/site";

type SourceAccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SourceAccessModal({
  open,
  onClose,
}: SourceAccessModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const subject = "GitHub source code access request";
  const body =
    "Hello Parichehr,\n\nI would like to request access to your private source code.\n\nMy name and role:\nReason for access:\n\nThank you.";

  return (
    <div
      className="source-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="source-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="source-modal-title"
      >
        <button
          type="button"
          className="source-modal__close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={19} aria-hidden="true" />
        </button>

        <div className="source-modal__icon">
          <LockKeyhole size={25} aria-hidden="true" />
        </div>

        <span className="source-modal__eyebrow">RESTRICTED ACCESS</span>

        <h3 id="source-modal-title">Private Source Code</h3>

        <p>
          My GitHub source code is not publicly available. If you are a
          recruiter or potential employer interested in reviewing my work,
          you can request access by email.
        </p>

        <a
          className="source-modal__request"
          href={`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
        >
          <Mail size={17} aria-hidden="true" />
          Request Access
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <span className="source-modal__note">
          Access requests are reviewed individually.
        </span>
      </section>
    </div>
  );
}