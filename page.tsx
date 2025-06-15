"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  biayaPencairan: z
    .string()
    .min(1, { message: "Biaya pencairan harus dipilih" }),
  perhitunganPremi: z
    .string()
    .min(1, { message: "Perhitungan premi harus dipilih" }),
  hargaPokokPerolehan: z.string().min(1, { message: "HPP harus diisi" }),
  dpUangMuka: z.string().min(1, { message: "DP harus diisi" }),
  totalPembiayaan: z
    .string()
    .min(1, { message: "Total pembiayaan harus diisi" }),
  provisiPersen: z.string().min(1, { message: "Provisi Persen harus diisi" }),
  provisiNominal: z.string().min(1, { message: "Provisi Nominal harus diisi" }),
  provisiAmortasi: z.boolean().optional(),
  adminPersen: z.string().min(1, { message: "Admin Persen harus diisi" }),
  adminNominal: z.string().min(1, { message: "Admin Nominal harus diisi" }),
  adminAmortasi: z.boolean().optional(),
  notarielPersen: z
    .string()
    .min(1, { message: "Notariel Persen harus diisi" }),
  notarielNominal: z
    .string()
    .min(1, { message: "Notariel Nominal harus diisi" }),
});

type FormData = z.infer<typeof formSchema>;

export default function FormTambah() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      biayaPencairan: "",
      perhitunganPremi: "",
      hargaPokokPerolehan: "",
      dpUangMuka: "",
      totalPembiayaan: "",
      provisiAmortasi: false,
      // Initialize all other fields
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast({
      title: "Success!",
      description: "Data jumlah pembiayaan berhasil disimpan.",
    });
    router.push("/master/barang");
  };

  return (
    <div className="flex flex-col space-y-6 p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/finance">Finance</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/finance/loan">Loan</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/finance/loan/data-rekening">Data Rekening</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/finance/loan/data-rekening/jumlah-pembiayaan">
                  Jumlah Pembiayaan
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Form Tambah</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 text-[#525252]">
            Tambah Jumlah Pembiayaan
          </h2>
          <div className="overflow-x-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Jumlah Pembiayaan & Potongan Section */}
                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4">
                    Jumlah Pembiayaan & Potongan
                  </h3>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="biayaPencairan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Biaya Pencairan{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/6">
                                <SelectValue placeholder="Select Value" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dp-biaya-potong">
                                DP dan Biaya Potong Plafond
                              </SelectItem>
                              <SelectItem value="dp-biaya-kantor">
                                DP dan Biaya (Ke Kantor) Dimuka
                              </SelectItem>
                              {/* Other options */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="perhitunganPremi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Perhitungan Premi{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/6">
                                <SelectValue placeholder="Select Value" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="persentase-pokok">
                                Persentase Pokok Pinjaman
                              </SelectItem>
                              <SelectItem value="persentase-hpp">
                                Persentase HPP
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="hargaPokokPerolehan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Harga Pokok Perolehan{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Masukkan HPP" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="dpUangMuka"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            DP (Uang Muka){" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Masukkan DP" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="totalPembiayaan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Total Pembiayaan{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Masukkan total pembiayaan"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Provisi Section */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-3">
                    {/* Percentage Input with Suffix */}
                    <FormField
                      control={form.control}
                      name="provisiPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Presentase Provisi
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8" // Add padding for the suffix
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Nominal Input */}
                    <FormField
                      control={form.control}
                      name="provisiNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nominal Provisi
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nominal" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Amortasi Checkbox - Centered */}
                    <FormField
                      control={form.control}
                      name="provisiAmortasi"
                      render={({ field }) => (
                        <FormItem className="flex flex-col mt-4">
                          <div className="flex items-center space-x-2 h-full">
                            <FormControl>
                              <Input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="w-4 h-4"
                              />
                            </FormControl>
                            <FormLabel className="text-[#525252]  m-0">
                              Amortasi Provisi
                            </FormLabel>
                          </div>
                          <FormMessage className="mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-3">
                    {/* Percentage Input with Suffix */}
                    <FormField
                      control={form.control}
                      name="adminPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Presentase Admin
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8" // Add padding for the suffix
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Nominal Input */}
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nominal Admin
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nominal" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Amortasi Checkbox - Centered */}
                    <FormField
                      control={form.control}
                      name="adminAmortasi"
                      render={({ field }) => (
                        <FormItem className="flex flex-col mt-4">
                          <div className="flex items-center space-x-2 h-full">
                            <FormControl>
                              <Input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="w-4 h-4"
                              />
                            </FormControl>
                            <FormLabel className="text-[#525252]  m-0">
                              Amortasi Admin
                            </FormLabel>
                          </div>
                          <FormMessage className="mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-3">
                    {/* Percentage Input with Suffix */}
                    <FormField
                      control={form.control}
                      name="notarielPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Presentase Notariel
                          </FormLabel>
                          <div className="relative w-1/2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8" // Add padding for the suffix
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Nominal Input */}
                    <FormField
                      control={form.control}
                      name="notarielNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nominal Notariel
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nominal" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Amortasi Checkbox - Centered */}
                  </div>

                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="hargaPokokPerolehan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Simpanan Jaminan
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Type value" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="hargaPokokPerolehan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Lain-lain
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Type value" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    {/* Percentage Input with Suffix */}
                    <FormField
                      control={form.control}
                      name="notarielPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Material
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Type Value"
                                className="pr-8" // Add padding for the suffix
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252]">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Nominal Input */}
                    <FormField
                      control={form.control}
                      name="notarielNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            HPP
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nominal" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Amortasi Checkbox - Centered */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-3">
                    {/* Percentage Input - 35% width */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Asuransi Jiwa
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8 w-full" // Full width within its column
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Nominal Input - 35% width with Rp suffix */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiNominal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Nominal Asuransi Jiwa
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Type Value"
                                  className="pr-8 w-full"
                                />
                              </FormControl>
                              <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                Rp
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 1 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 2 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-3">
                    {/* Percentage Input - 35% width */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Asuransi Kendaraan
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8 w-full" // Full width within its column
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Nominal Input - 35% width with Rp suffix */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiNominal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Nominal Asuransi Kendaraan
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Type Value"
                                  className="pr-8 w-full"
                                />
                              </FormControl>
                              <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                Rp
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 1 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 2 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-3">
                    {/* Percentage Input - 35% width */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Asuransi Kebakaran
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8 w-full" // Full width within its column
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Nominal Input - 35% width with Rp suffix */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiNominal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Nominal Asuransi Kebakaran
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Type Value"
                                  className="pr-8 w-full"
                                />
                              </FormControl>
                              <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                Rp
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 1 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 2 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-3">
                    {/* Percentage Input - 35% width */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Barang (CPM/HE)
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8 w-full" // Full width within its column
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Nominal Input - 35% width with Rp suffix */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiNominal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Nominal Asuransi Barang (CPM/HE)
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Type Value"
                                  className="pr-8 w-full"
                                />
                              </FormControl>
                              <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                Rp
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 1 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 2 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-3">
                    {/* Percentage Input - 35% width */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Ekspedisi (Cargo)
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8 w-full" // Full width within its column
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Nominal Input - 35% width with Rp suffix */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiNominal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Nominal Asuransi Ekspedisi (Cargo)
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Type Value"
                                  className="pr-8 w-full"
                                />
                              </FormControl>
                              <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                Rp
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 1 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 2 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-3">
                    {/* Percentage Input - 35% width */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Persentase Konstruksi (EAR)
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8 w-full" // Full width within its column
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Nominal Input - 35% width with Rp suffix */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiNominal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Nominal Asuransi Konstruksi (EAR)
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Type Value"
                                  className="pr-8 w-full"
                                />
                              </FormControl>
                              <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                Rp
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 1 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 2 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-3">
                    {/* Percentage Input - 35% width */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Asuransi Kredit
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8 w-full" // Full width within its column
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Nominal Input - 35% width with Rp suffix */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="provisiNominal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Nominal Asuransi Kredit
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Type Value"
                                  className="pr-8 w-full"
                                />
                              </FormControl>
                              <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                Rp
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 1 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Ditanggung Lembaga
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Checkbox 2 - 15% width */}
                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="hargaPokokPerolehan"
                      render={({ field }) => (
                        <FormItem className="w-1/4">
                          <FormLabel className="text-[#525252] font-bold">
                            Biaya Survey
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Masukkan HPP" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="hargaPokokPerolehan"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-[#525252] font-bold">
                            Biaya Appraisal
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Masukkan HPP" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
                    {/* Percentage Input - 35% width */}
                    <div className="md:col-span-1">
                      <FormField
                        control={form.control}
                        name="provisiPersen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Fee (Biaya Pemasaran)
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="0"
                                  className="pr-8 w-full" // Full width within its column
                                />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                %
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Nominal Input - 35% width with Rp suffix */}
                    <div className="md:col-span-1">
                      <FormField
                        control={form.control}
                        name="provisiNominal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#525252] font-bold">
                              Nominal Asuransi Kebakaran
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Type Value"
                                  className="pr-8 w-full"
                                />
                              </FormControl>
                              <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                                Rp
                              </span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="md:col-span-1 flex items-center">
                      <FormField
                        control={form.control}
                        name="provisiAmortasi"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <div className="flex items-center space-x-2 h-full pt-[1.625rem]">
                              {" "}
                              {/* Align with inputs */}
                              <FormControl>
                                <Input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#525252] m-0">
                                Amortasi
                              </FormLabel>
                            </div>
                            <FormMessage className="mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Data Angsuran Section */}
                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4">
                    Data Angsuran
                  </h3>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="biayaPencairan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tipe Angsuran
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Value" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dp-biaya-potong">
                                DP dan Biaya Potong Plafond
                              </SelectItem>
                              <SelectItem value="dp-biaya-kantor">
                                DP dan Biaya (Ke Kantor) Dimuka
                              </SelectItem>
                              {/* Other options */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="biayaPencairan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Alokasi Bunga
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/6">
                                <SelectValue placeholder="Select Value" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dp-biaya-potong">
                                DP dan Biaya Potong Plafond
                              </SelectItem>
                              <SelectItem value="dp-biaya-kantor">
                                DP dan Biaya (Ke Kantor) Dimuka
                              </SelectItem>
                              {/* Other options */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="biayaPencairan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tanggal Cetak
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/6">
                                <SelectValue placeholder="Select Value" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dp-biaya-potong">
                                DP dan Biaya Potong Plafond
                              </SelectItem>
                              <SelectItem value="dp-biaya-kantor">
                                DP dan Biaya (Ke Kantor) Dimuka
                              </SelectItem>
                              {/* Other options */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    {/* Percentage Input with Suffix */}
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Jangka Waktu
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Type Number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="biayaPencairan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Select Time Option
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/2">
                                <SelectValue placeholder="Select Value" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dp-biaya-potong">
                                DP dan Biaya Potong Plafond
                              </SelectItem>
                              <SelectItem value="dp-biaya-kantor">
                                DP dan Biaya (Ke Kantor) Dimuka
                              </SelectItem>
                              {/* Other options */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Frekuensi tagihan dalam sebulan
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Type Number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="biayaPencairan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tipe Angsuran
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/2">
                                <SelectValue placeholder="Select Value" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dp-biaya-potong">
                                DP dan Biaya Potong Plafond
                              </SelectItem>
                              <SelectItem value="dp-biaya-kantor">
                                DP dan Biaya (Ke Kantor) Dimuka
                              </SelectItem>
                              {/* Other options */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Periode
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input {...field} placeholder="Type Number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Grace Periode Pokok
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input {...field} placeholder="Type Here" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Grace Periode Imbal Hasil
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input {...field} placeholder="Type Here" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Grace Periode Angsuran
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input {...field} placeholder="Type Here" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Grace Periode Cair/PRK
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input {...field} placeholder="Type Here" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Termin Pokok
                          </FormLabel>
                          <FormControl className="w-1/2">
                            <Input {...field} placeholder="Type Number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Termin Imbal Hasil
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input {...field} placeholder="Type Number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Angsuran Tagihan
                          </FormLabel>
                          <FormControl className="w-1/2">
                            <Input {...field} placeholder="Type Number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Angsuran Pokok Akhir
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input {...field} placeholder="Type Number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tanggal Realisasi
                          </FormLabel>
                          <FormControl className="w-[77%]">
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tanggal Angsuran
                          </FormLabel>
                          <FormControl className="w-[77%]">
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tanggal Jatuh Tempo
                          </FormLabel>
                          <FormControl className="w-[77%]">
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4">
                    Parameter Denda, Penalti Pelunasan Dini dan Bonus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="provisiPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Persentase Denda
                          </FormLabel>
                          <div className="relative w-1/2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8 w-full" // Full width within its column
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="provisiNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nominal Denda
                          </FormLabel>
                          <div className="relative w-1/2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Type Value"
                                className="pr-8 w-full"
                              />
                            </FormControl>
                            <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                              Rp
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="provisiPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Jatuh Tempo
                          </FormLabel>
                          <div className="relative w-full">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8 w-full" // Full width within its column
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="hargaPokokPerolehan"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel className="text-[#525252] font-bold">
                            Pokok
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Type Here" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="provisiPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Imbal Hasil
                          </FormLabel>
                          <div className="relative w-full">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8 w-full" // Full width within its column
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="hargaPokokPerolehan"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel className="text-[#525252] font-bold">
                            Grace Periode Denda
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Type Here" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="provisiPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Bonus
                          </FormLabel>
                          <div className="relative w-1/2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8 w-full" // Full width within its column
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="border-2 border-solid p-4 rounded-lg">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4">
                    Biaya Tambahan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="provisiPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Persentase Admin per Angsuran
                          </FormLabel>
                          <div className="relative w-1/2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8 w-full" // Full width within its column
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="provisiNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nominal Admin per Angsuran
                          </FormLabel>
                          <div className="relative w-full">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Type Value"
                                className="pr-8 w-full"
                              />
                            </FormControl>
                            <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                              Rp
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="provisiPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Persentase Fee per Angsuran
                          </FormLabel>
                          <div className="relative w-1/2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8 w-full" // Full width within its column
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="provisiNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nominal Fee per Angsuran
                          </FormLabel>
                          <div className="relative w-full">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Type Value"
                                className="pr-8 w-full"
                              />
                            </FormControl>
                            <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                              Rp
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="provisiPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Persentase PPN per Angsuran
                          </FormLabel>
                          <div className="relative w-1/2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8 w-full" // Full width within its column
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="provisiNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nominal PPN per Angsuran
                          </FormLabel>
                          <div className="relative w-full">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Type Value"
                                className="pr-8 w-full"
                              />
                            </FormControl>
                            <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                              Rp
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-3">
                    <FormField
                      control={form.control}
                      name="provisiPersen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Persentase PPh23 per Angsuran
                          </FormLabel>
                          <div className="relative w-1/2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="0"
                                className="pr-8 w-full" // Full width within its column
                              />
                            </FormControl>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
                              %
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="provisiNominal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nominal PPh23 per Angsuran
                          </FormLabel>
                          <div className="relative w-full">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Type Value"
                                className="pr-8 w-full"
                              />
                            </FormControl>
                            <span className="text-md font-[500] absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2196F3]">
                              Rp
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    className="bg-gray-500 text-white hover:bg-gray-600"
                    onClick={() => router.back()}
                  >
                    Kembali
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
