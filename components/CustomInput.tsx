import { motion } from "framer-motion";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  autocomplete?: string;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  autocomplete,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <motion.div
          className="form-item group relative mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative flex w-full flex-col">
            <FormControl>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Input
                  placeholder={placeholder}
                  className="input-class peer border-foreground/20 bg-background/80  shadow-lg backdrop-blur-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  type={name === "password" ? "password" : "text"}
                  {...field}
                  id={name}
                  autoComplete={autocomplete}
                />
              </motion.div>
            </FormControl>
            <FormLabel className="form-label absolute left-3 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-muted-foreground duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1.5 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary">
              {label}
            </FormLabel>
            <FormMessage className="form-message mt-2" />
          </div>
          <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 transition-opacity group-focus-within:opacity-100" />
        </motion.div>
      )}
    />
  );
};

export default CustomInput;
