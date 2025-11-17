import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from "zod"
import { useGetOrderUser } from "@/http/get/useGetOrderUser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginAdmin } from "@/http/post/useLoginAdmin";

const formSchema = z.object({
    CPF: z.string().min(11, "CPF deve ter no mínimo 11 caracteres"),
    Senha: z.string().optional(),
})

export const FormOrder = () => {
  const { mutateAsync: postLogin } = useLoginAdmin();

  const [CPFValue, setCPFValue] = useState<string | undefined>();
  const [isAdminForm, setIsAdminForm] = useState(false);

  const { data: dataUserOrders, error: dataUserError} = useGetOrderUser(CPFValue);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CPF: "",
      Senha: "",
    },
  });

  useEffect(() => {
    if (!dataUserOrders) return;

    if ("adminCPF" in dataUserOrders && dataUserOrders.adminCPF) {
      setIsAdminForm(true);
      return;
    }

    if (!("adminCPF" in dataUserOrders)) {
        navigate("/user/order");
    }
  }, [dataUserOrders, navigate]);

  useEffect(() => {
  if (dataUserError) {
    const err = dataUserError as { status?: number; message?: string };

    if (err.status === 404) {
      form.setError("CPF", {
        type: "manual",
        message: "CPF inválido!",
      });
      setCPFValue(undefined); 
      return;
    }
  }
}, [dataUserError, form]);

  const handleForm = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!CPFValue) {
        setCPFValue(values.CPF);
        return;
      }

      if (isAdminForm) {
        const senha = values.Senha?.trim() ?? "";

        if (senha.length < 6) {
          form.setError("Senha", {
            type: "manual",
            message: "Senha deve ter no mínimo 6 caracteres",
          });
          return;
        }

        await postLogin({
          CPF: values.CPF,
          Senha: senha,
        });
      }
    } catch (error) {
      const loginError = error as { status?: number; message?: string };

      if (loginError.status === 401) {
        form.setError("Senha", {
          type: "manual",
          message: "Senha inválida!",
        });
      }

      if (loginError.status === 404) {
        console.log("testeeee")
        form.setError("CPF", {
          type: "manual",
          message: "CPF inválido!",
        });
      }

      console.error("LoginError:", loginError);
    }
  };

  return (
    <div className="flex gap-4">
      <Form {...form}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit(handleForm)(event);
          }}
          className="flex items-end flex-col sm:gap-2 gap-4 sm:flex-row relative"
        >
          <FormField
            control={form.control}
            name="CPF"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-orange-500">CPF:</FormLabel>
                <FormControl>
                  <Input
                    className="bg-orange-50 border border-orange-500 text-orange-700 placeholder-orange-400 sm:w-53 xss:w-45 w-30"
                    placeholder="12345678910"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-25px]" />
              </FormItem>
            )}
          />


          {isAdminForm && (
            <FormField
              control={form.control}
              name="Senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Senha do Admin</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="text-white sm:w-53 xss:w-45 w-30"
                      placeholder="Senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute bottom-[-25px]" />
                </FormItem>
              )}
            />
          )}

        <Button
        type="submit"
        className="bg-orange-500 text-white border border-orange-500 rounded-lg px-4 py-2 hover:bg-white hover:text-orange-500 transition-colors"
        >
        Entrar
        </Button>



        </form>
      </Form>
    </div>
  );
};
