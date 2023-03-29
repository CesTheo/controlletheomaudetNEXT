import { Select, Stack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const DatePicker = () => {
  const router = useRouter();

  const dates = [];
  const today = dayjs();
  for (let i = 0; i < 7; i++) {
    dates.push(today.add(i, "day"));
  }

  const handleDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value;
    router.push(`/deploy/${selectedDate}`);
  };

  return (
    <Stack>
      <Select
        placeholder="Sélectionner une date de déploiement"
        onChange={handleDateSelect}
      >
        {dates.map((option) => (
          <option key={option.toISOString()} value={option.toISOString()}>
            {option.format("DD/MM/YYYY")}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default DatePicker;
