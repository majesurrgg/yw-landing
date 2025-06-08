import MainLayout from "../layouts/MainLayout";
import VolunteerForm from "../components/VolunteerForm";

export default function Volunteering() {
  return (
    <MainLayout>
        <section className="max-w-5x1 mx-auto">
            <VolunteerForm />
        </section>
    </MainLayout>
  )
}
