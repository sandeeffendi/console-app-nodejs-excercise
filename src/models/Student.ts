type Status = "Lulus" | "Tidak Lulus";

interface StudentProps {
  id: string;
  name: string;
  score: number;
}

class Student {
  id: string;
  name: string;
  score: number;
  grade: Status;

  constructor(props: StudentProps) {
    this.id = props.id;
    this.name = props.name;
    this.score = props.score;
    this.grade = Student.calculateScore(props.score);
  }

  private static calculateScore(score: number): Status {
    if (score >= 75) return "Lulus";
    return "Tidak Lulus";
  }
}

export { type Status, type StudentProps, Student };
