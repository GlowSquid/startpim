import Link from "next/link";

function Footer() {
  return (
    <div>
      <p className="footer">
        &copy; Copyright{" "}
        <Link href="https://glowsquid.com/">
          <a target="_blank" rel="noopener noreferrer">
            GlowSquid.com
          </a>
        </Link>{" "}
        {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default Footer;
