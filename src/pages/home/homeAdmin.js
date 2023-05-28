import Footer from "~/components/layouts/footer";
import Header from "~/components/layouts/header";
import Button from "~/components/button";


function HomeAdmin() {
  return ( 
    <>
    <Header />
    <Button to=''>Add Student</Button>
    <Button to=''>Add Teacher</Button>
    <Button to=''>Create Evaluation</Button>
    <Button to=''>Add Project</Button>
    {/* <Footer /> */}
    </>
  );
}

export default HomeAdmin;