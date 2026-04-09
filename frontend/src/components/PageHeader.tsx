import { TITLE } from "../constants/texts";

// Simple header component for page title
export default function PageHeader() {
  return (
    <h1 className="title">
      {TITLE}
    </h1>
  );
}