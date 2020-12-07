import Table from "../../shared/table/table";
import { Title, Subtitle } from "../../shared/text/styles";
import { Container, Wrapper } from "../../shared/container/styles";

const Cells = () => {
  return (
    <Container>
      <Title>Cells</Title>
      <Subtitle>
        Fill the cells with numbers and operate them with formulas like{" "}
        <code>=A1+A2</code>
      </Subtitle>
      <Table columns={27} rows={100} />
    </Container>
  );
};

export default Cells;
