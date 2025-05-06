"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { Loader2, Lock } from "lucide-react";
import { authFormSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { motion, AnimatePresence } from "framer-motion";
import PlaidLink from "./PlaidLink";

const ConstructionMessage = () => {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col items-center gap-6 text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-6xl"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🚧
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to Horizon!
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          This platform is currently under development by{" "}
          <a
            href="https://www.linkedin.com/in/marcos-web-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Marcos Sanchez
          </a>
          . Thank you for being an early explorer! 🌟
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          Your account is now ready! You can login anytime using your
          credentials. All data is protected with bank-level security.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-green-600">
          <Lock className="h-4 w-4" />
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4"
      >
        <Button
          onClick={() => router.push("/")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg"
        >
          Explore Horizon Now →
        </Button>
      </motion.div>
    </motion.div>
  );
};

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);

  const defaultValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    state: "",
    postalCode: "",
    dateOfBirth: "",
    ssn: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };

        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.section
        className="auth-form relative z-10 mx-auto max-w-md rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:bg-gray-900/90"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex flex-col gap-5 md:gap-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex cursor-pointer items-center gap-1">
              <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Horizon logo"
                className="drop-shadow-glow"
              />
              <h1 className="text-26 bg-gradient-to-r from-primary to-secondary bg-clip-text font-ibm-plex-serif font-bold">
                Horizon
              </h1>
            </Link>
          </motion.div>

          <div className="flex flex-col gap-1 md:gap-3">
            <motion.h1
              className="text-24 font-semibold text-gray-900 dark:text-white lg:text-36"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              {user
                ? "Link Account"
                : type === "sign-in"
                ? "Sign In"
                : "Sign Up"}
            </motion.h1>

            <motion.div
              className="text-16 font-normal text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {user ? (
                <p>Link your account to get started</p>
              ) : (
                <>
                  <p>
                    This is a demo app made by me,{" "}
                    <a
                      href="https://www.linkedin.com/in/marcos-web-dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Marcos Sanchez
                    </a>
                    . <br />
                    You can test it using this account:
                    <br />- <strong>holamundo@gmail.com</strong> <br />-{" "}
                    <strong>password: holamundo</strong>
                  </p>
                  <p>
                    Or you can create a new one using the &quot;Sign up&quot;
                    form.
                  </p>
                </>
              )}
            </motion.div>
          </div>
        </header>

        {user ? (
          <div className="flex flex-col gap-4">
            <ConstructionMessage />
            <PlaidLink user={user} variant="primary" />
          </div>
        ) : (
          <>
            <Form {...form}>
              <AnimatePresence mode="wait">
                <motion.form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {type === "sign-up" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex gap-4">
                        <CustomInput
                          control={form.control}
                          name="firstName"
                          label="First Name"
                          placeholder="Enter your first name"
                          autocomplete="given-name"
                        />
                        <CustomInput
                          control={form.control}
                          name="lastName"
                          label="Last Name"
                          placeholder="Enter your last name"
                          autocomplete="family-name"
                        />
                      </div>
                      <CustomInput
                        control={form.control}
                        name="address1"
                        label="Address"
                        placeholder="Enter your specific address"
                        autocomplete="street-address"
                      />
                      <CustomInput
                        control={form.control}
                        name="city"
                        label="City"
                        placeholder="Enter your city"
                        autocomplete="address-level2"
                      />
                      <div className="flex gap-4">
                        <CustomInput
                          control={form.control}
                          name="state"
                          label="State"
                          placeholder="Example: NY"
                          autocomplete="address-level1"
                        />
                        <CustomInput
                          control={form.control}
                          name="postalCode"
                          label="Postal Code"
                          placeholder="Example: 11101"
                          autocomplete="postal-code"
                        />
                      </div>
                      <div className="flex gap-4">
                        <CustomInput
                          control={form.control}
                          name="dateOfBirth"
                          label="Date of Birth"
                          placeholder="YYYY-MM-DD"
                          autocomplete="bday"
                        />
                        <CustomInput
                          control={form.control}
                          name="ssn"
                          label="SSN"
                          placeholder="Example: 1234"
                          autocomplete="off"
                        />
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    className="space-y-6"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  >
                    <CustomInput
                      control={form.control}
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                      autocomplete="email"
                    />
                    <CustomInput
                      control={form.control}
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                      autocomplete="current-password"
                    />
                  </motion.div>

                  <motion.div
                    className="flex flex-col gap-4"
                    whileHover={{ scale: 1.01 }}
                  >
                    <Button
                      type="submit"
                      className="form-btn group relative overflow-hidden bg-gradient-to-r from-primary to-secondary shadow-lg transition-all hover:shadow-primary/30"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2
                            size={20}
                            className="animate-spin text-white"
                          />
                          <span className="ml-2">Loading...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">
                            {type === "sign-in" ? "Sign In" : "Sign Up"}
                          </span>
                          <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </AnimatePresence>
            </Form>

            <motion.footer
              className="flex justify-center gap-1 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-14 font-normal text-gray-600 dark:text-gray-400">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="form-link relative before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-primary before:transition-all before:duration-300 hover:before:w-full"
              >
                {type === "sign-in" ? "Sign up" : "Sign in"}
              </Link>
            </motion.footer>
          </>
        )}
      </motion.section>
    </div>
  );
};

export default AuthForm;
