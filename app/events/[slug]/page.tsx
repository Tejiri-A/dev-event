import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type Props = { params: Promise<{ slug: string }> };

const EventDetails = async ({ params }: Props) => {
  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/api/events/${slug}`);
  const { data:event } = await res.json();

  if (!event) return notFound();

  return (
    <section id="event">
      <h1>
        Event Details: <br /> {slug}
      </h1>
    </section>
  );
};
export default EventDetails;
