import { FC } from "react";
import styles from "./FullWidthImage.module.css";

const publicUrl = import.meta.env.BASE_URL;

type FullWidthImageProps = {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
};

const FullWidthImage: FC<FullWidthImageProps> = ({
  imageUrl = `${publicUrl}images/bg.png`,
  title = "WE SHAPE THE ESSENCE",
  subtitle = "Designing homes that inspire",
}) => {
  // No CTA/popup state needed

  return (
    <section className={styles["fwi-wrapper"]}>
      <div
        className={styles["fwi-hero-image"]}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className={styles["fwi-hero-text"]}>
          <h1 className={styles["fwi-title"]}>{title}</h1>
          <p className={styles["fwi-subtitle"]}>{subtitle}</p>
          {/* No CTA button needed */}
        </div>

        {/* No exclusions/popup or CTA — simplified hero */}
      </div>
    </section>
  );
};

export default FullWidthImage;
