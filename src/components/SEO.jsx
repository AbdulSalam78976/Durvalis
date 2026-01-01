
export default function SEO({ title, description, canonical }) {
    return (
        <>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {canonical && <link rel="canonical" href={canonical} />}
        </>
    );
}
