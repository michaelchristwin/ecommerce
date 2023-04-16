import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

function Navbar() {
  return (
    <div className="navbar-container pb-[15px]">
      <p className="logo">
        <Link href={`/`}>Mikey Headphones</Link>
      </p>
      <button type="button" className="cart-icon">
        <AiOutlineShopping />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
}

export default Navbar;
