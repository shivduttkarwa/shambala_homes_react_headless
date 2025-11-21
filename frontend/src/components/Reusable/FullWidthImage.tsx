import { FC, useState } from "react";
import styles from "./FullWidthImage.module.css";

const publicUrl = import.meta.env.BASE_URL;

type FullWidthImageProps = {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
};

const FullWidthImage: FC<FullWidthImageProps> = ({
  imageUrl = `${publicUrl}images/1.jpg`,
  title = "WE SHAPE THE ESSENCE OF LIVING",
  subtitle = "We envision spaces that are not just lived in, but felt — where every element has been curated to inspire connection, serenity, and belonging.",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles["fwi-wrapper"]}>
      <div
        className={styles["fwi-hero-image"]}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className={styles["fwi-hero-text"]}>
          <h1 className={styles["fwi-title"]}>{title}</h1>
          <p className={styles["fwi-subtitle"]}>{subtitle}</p>
          <button type="button" className={styles["fwi-shop-button"]}>
            SHOP NOW
          </button>
        </div>

        <div className={styles["fwi-hero-exclusions"]}>
          <button
            className={styles["fwi-exclusions-link"]}
            onClick={() => setOpen(true)}
            aria-expanded={open}
          >
            <span className={styles["fwi-exclusions-text"]}>
              *click here for details
            </span>
          </button>
        </div>

        {open && (
          <div
            className={styles["fwi-overlay"]}
            role="dialog"
            aria-modal="true"
            aria-label="Promotional details"
          >
            <div className={styles["fwi-popup"]}>
              <button
                aria-label="Close popup"
                className={styles["fwi-close"]}
                onClick={() => setOpen(false)}
              >
                ×
              </button>
              <div className={styles["fwi-content"]}>
                <h2>Promotional Information &amp; Exclusions</h2>
                <p>This is a list of exclusions</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FullWidthImage;
