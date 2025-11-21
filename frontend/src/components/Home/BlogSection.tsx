import React, { useLayoutEffect, useRef } from "react";
import "./BlogSection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollVelocity from "../animations/ScrollVelocity";
import GlassButton from "../UI/GlassButton";
import SimpleSwiper from "../UI/SimpleSwiper";
import "../UI/SimpleSwiper.css";

const publicUrl = import.meta.env.BASE_URL;

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  featured?: boolean;
  additional_text?: string;
  additional_image?: {
    src: string;
    alt: string;
  } | null;
  swiperImages?: string[];
}

interface BlogSectionProps {
  sectionTitle?: string;
  ctaText?: string;
  ctaLink?: string;
  posts?: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({
  sectionTitle = "Latest Insights",
  ctaText: _ctaText = "View all blog posts",
  ctaLink: _ctaLink = "#",
  posts = [
    {
      id: 1,
      title: "Creating Sustainable Living Spaces with Shambala Homes",
      date: "15 Nov 2025",
      category: "Sustainability",
      excerpt:
        "Discover how our eco-friendly construction methods and sustainable materials are revolutionizing modern Australian home building while reducing environmental impact.",
      imageSrc: `${publicUrl}images/port1.jpg`,
      imageAlt: "Sustainable home construction",
      link: "#",
      featured: true,
      swiperImages: [
        `${publicUrl}images/port1.jpg`,
        `${publicUrl}images/port2.jpg`,
        `${publicUrl}images/port3.jpg`,
        `${publicUrl}images/pexels-expect-best-79873-323780.jpg`
      ],
    },
    {
      id: 2,
      title: "How Landscaping Enhances Property Value in Australia",
      date: "12 Nov 2025",
      category: "Design",
      excerpt:
        "Discover how strategic landscaping can significantly increase your property value while creating beautiful outdoor spaces that complement your Shambala home.",
      imageSrc: `${publicUrl}images/blog2.jpg`,
      imageAlt: "Landscaping design",
      link: "#",
    },
    {
      id: 3,
      title: "Modern Australian Home Designs Inspired by Nature",
      date: "10 Nov 2025",
      category: "Architecture",
      excerpt:
        "Explore our contemporary architectural designs that seamlessly blend with the natural Australian landscape, creating harmony between built and natural environments.",
      imageSrc: `${publicUrl}images/blog3.jpg`,
      imageAlt: "Modern home design",
      link: "#",
    },
  ],
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredPost = posts[0]; // First blog for featured section
  const gridPosts = posts.slice(1, 3); // Next 2 blogs for grid section

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // IMAGE SLIDE-IN
      gsap.utils.toArray(".home-blog-reveal-img img").forEach((img) => {
        gsap.to(img as HTMLElement, {
          x: "0%",
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img as HTMLElement,
            start: "top 85%",
          },
        });
      });

      // TEXT HEADING REVEAL
      document.querySelectorAll(".home-blog-heading").forEach((heading) => {
        const words = (heading.textContent || "").trim().split(" ");
        heading.innerHTML = "";

        words.forEach((word, index) => {
          const span = document.createElement("span");
          span.textContent = word;
          heading.appendChild(span);

          // Add space after each word except the last one
          if (index < words.length - 1) {
            heading.appendChild(document.createTextNode(" "));
          }
        });

        gsap.to(heading.querySelectorAll("span"), {
          y: "0%",
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.035,
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="blog-section-wrapper" ref={sectionRef}>
      {/* SCROLL VELOCITY TITLE */}
      <div className="blog-header">
        <div className="blog-title-container">
          <div className="blog-title-line"></div>
          <ScrollVelocity
            texts={[`${sectionTitle} •`]}
            velocity={30}
            className="blog-scroll-title"
            numCopies={4}
            parallaxClassName="blog-parallax"
            scrollerClassName="blog-scroller"
          />
          <div className="blog-title-line"></div>
        </div>
      </div>

      {/* FIRST SCREEN - 90VH HEIGHT WITH FEATURED BLOG */}
      <section className="blog-featured-section">
        <div className="blog-featured-container">
          {/* Image Half */}
          <div className="blog-featured-image home-blog-reveal-img">
            {featuredPost.swiperImages ? (
              <SimpleSwiper 
                images={featuredPost.swiperImages}
                autoplaySpeed={4000}
                className="blog-featured-swiper"
                showPagination={true}
                showNavigation={false}
              />
            ) : (
              <img src={featuredPost.imageSrc} alt={featuredPost.imageAlt} />
            )}
          </div>

          {/* Content Half */}
          <div className="blog-featured-content">
            <h1 className="blog-featured-title home-blog-heading">
              {featuredPost.title}
            </h1>

            <p className="blog-featured-description">{featuredPost.excerpt}</p>

            <GlassButton href={featuredPost.link}>Read More</GlassButton>
          </div>
        </div>
      </section>

      {/* SECOND SCREEN - 2 BLOGS LAYOUT */}
      <section className="blog-posts-section">
        <div className="blog-posts-container">
          {gridPosts.map((post) => (
            <article key={post.id} className="blog-post-card">
              <h3 className="blog-post-title home-blog-heading">
                {post.title}
              </h3>

              <div className="blog-post-image home-blog-reveal-img">
                <img src={post.imageSrc} alt={post.imageAlt} />
              </div>

              <p className="blog-post-description">{post.excerpt}</p>

              <GlassButton href={post.link}>Read More</GlassButton>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
