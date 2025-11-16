import React, { useLayoutEffect, useRef } from 'react';
import './BlogSection.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollVelocity from '../animations/ScrollVelocity';

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
}

interface BlogSectionProps {
  sectionTitle?: string;
  ctaText?: string;
  ctaLink?: string;
  posts?: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({
  sectionTitle = "Design Tips",
  ctaText = "View all blog posts",
  ctaLink = "#",
  posts = [
    {
      id: 1,
      title: "Celebrating our new Associates: Callum, Fraser, Gavin & Sebastian",
      date: "10 Sep 2025",
      category: "Staff",
      excerpt: "We are delighted to announce four associate-level promotions within Aitken Turnbull: Callum Ford has been promoted to Associate & Technical Lead, Fraser Hunter and Gavin Fallen to Associate & Studio...",
      imageSrc: "https://www.aitken-turnbull.co.uk/wp-content/uploads/2025/09/Untitled-design-23.png",
      imageAlt: "Team members",
      link: "#",
      featured: true
    },
    {
      id: 2,
      title: "How Landscaping Enhances Property Value in Australia",
      date: "05 Oct 2025",
      category: "Design",
      excerpt: "Discover how strategic landscaping can significantly increase your property value while creating beautiful outdoor spaces.",
      imageSrc: "https://images.unsplash.com/photo-1508599589920-14cfa1c1fe2c",
      imageAlt: "Landscaping design",
      link: "#"
    },
    {
      id: 3,
      title: "Modern Australian Home Designs Inspired by Nature",
      date: "03 Oct 2025",
      category: "Homes",
      excerpt: "Explore contemporary architectural designs that seamlessly blend with the natural Australian landscape.",
      imageSrc: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      imageAlt: "Modern home design",
      link: "#"
    }
  ]
}) => {
  const sectionRef = useRef<HTMLElement>(null);
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
            start: "top 85%"
          }
        });
      });

      // TEXT HEADING REVEAL
      document.querySelectorAll(".home-blog-heading").forEach((heading) => {
        const words = (heading.textContent || '').trim().split(" ");
        heading.innerHTML = "";

        words.forEach(word => {
          const span = document.createElement("span");
          span.textContent = word + " ";
          heading.appendChild(span);
        });

        gsap.to(heading.querySelectorAll("span"), {
          y: "0%",
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.035,
          scrollTrigger: {
            trigger: heading,
            start: "top 85%"
          }
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
            <img src={featuredPost.imageSrc} alt={featuredPost.imageAlt} />
          </div>
          
          {/* Content Half */}
          <div className="blog-featured-content">
            <h1 className="blog-featured-title home-blog-heading">
              {featuredPost.title}
            </h1>
            
            <p className="blog-featured-description">
              {featuredPost.excerpt}
            </p>
            
            <a href={featuredPost.link} className="blog-featured-cta">
              Read Full Article
            </a>
          </div>
        </div>
      </section>

      {/* SECOND SCREEN - 2 BLOGS LAYOUT */}
      <section className="blog-posts-section">
        <div className="blog-posts-container">
          {gridPosts.map((post, index) => (
            <article key={post.id} className="blog-post-card">
              <h3 className="blog-post-title home-blog-heading">
                {post.title}
              </h3>
              
              <div className="blog-post-image home-blog-reveal-img">
                <img src={post.imageSrc} alt={post.imageAlt} />
              </div>
              
              <p className="blog-post-description">
                {post.excerpt}
              </p>
              
              <a href={post.link} className="blog-read-more-btn">
                Read More
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogSection;