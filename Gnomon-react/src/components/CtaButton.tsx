// src/components/CtaButton.tsx
import { Link } from 'react-router-dom';

// Usando TypeScript para definir quais props o componente aceita
interface CtaButtonProps {
    to: string;
    children: React.ReactNode;
    style?: React.CSSProperties; // Prop opcional para estilos inline
}

export default function CtaButton({ to, children, style }: CtaButtonProps) {
    return (
        <Link to={to} className="cta-button" style={style}>
            {children}
        </Link>
    );
}