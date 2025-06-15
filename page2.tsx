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
import React from "react";
import { z } from "zod";

const formSchema = z.object({
  noAplikasi: z.string().min(1, { message: "No Aplikasi is required" }),
  tglAplikasi: z.string().min(1, { message: "Tgl Aplikasi is required" }),
  noPersetujuan: z.string().min(1, { message: "No Persetujuan is required" }),
  tglPersetujuan: z.string().min(1, { message: "Tgl Persetujuan is required" }),
  satuanTerkecil: z.string().min(1, { message: "Status Rekening is required" }),
  namaNasabah: z.string().min(1, { message: "Nama Nasabah is required" }),
  produk: z.string().min(1, { message: "Produk is required" }),
  tipeBarang: z.string().min(1, { message: "Tipe Barang is required" }),
  distribusiImbalHasil: z
    .string()
    .min(1, { message: "Distribusi Imbal Hasil is required" }),
  supplierDeveloper: z
    .string()
    .min(1, { message: "Supplier / Developer is required" }),
  noPO: z.string().min(1, { message: "No PO is required" }),
  tglPO: z.string().min(1, { message: "Tgl PO is required" }),
  petugasCMO: z.string().min(1, { message: "Petugas CMO is required" }),
  kelompok: z.string().min(1, { message: "Kelompok is required" }),
  kolektor: z.string().min(1, { message: "Kolektor is required" }),
  sumberDana: z.string().min(1, { message: "Sumber Dana is required" }),
  namaLembaga: z.string().min(1, { message: "Nama Lembaga is required" }),
  takeOver: z.string().min(1, { message: "Take Over is required" }),
  reffBankAccount: z
    .string()
    .min(1, { message: "Reff. Bank Account/Virtual Account is required" }),
  jumlahDebitur: z.string().min(1, { message: "Jumlah Debitur is required" }),
  noPKLama: z.string().min(1, { message: "No PK Lama is required" }),
  tglPKLama: z.string().min(1, { message: "Tgl PK Lama is required" }),
  noPKBaru: z.string().min(1, { message: "No PK Baru is required" }),
  tglPKBaru: z.string().min(1, { message: "Tgl PK Baru is required" }),
  noAkteNotaris: z.string().min(1, { message: "No Akte Notaris is required" }),
  tglAkteNotaris: z
    .string()
    .min(1, { message: "Tgl Akte Notaris is required" }),
});

type FormData = z.infer<typeof formSchema>;

export default function FormTambah() {
  const router = useRouter();
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    toast({
      title: "Success!",
      description: "Data berhasil disimpan.",
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
                <Link href="/finance/loan/data-rekening/rekening-pembiayaan">
                  Rekening Pembiayaan
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
            Informasi Rekening Pembiayaan
          </h2>
          <div className="overflow-x-auto ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="border-2 border-solid p-4 rounded-lg mb-4">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Nomor Rekening
                  </h3>
                  <p className="text-[#525252] font-bold mb-4">
                    Generate Nomor Rekening
                  </p>

                  <FormField
                    control={form.control}
                    name="satuanTerkecil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#525252] font-bold">
                          Nomor Rekening{" "}
                          <span className="text-[#D92D20]">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-1/6 border-gray-300 focus:ring-2 focus:ring-blue-500">
                              <SelectValue placeholder="Pilih" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="7162317328">
                              7162317328
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-2 border-solid p-4 rounded-lg mb-4">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Data Cabang
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            ID Cabang <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nama Cabang{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            No Aplikasi{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-1/3">
                            <Input placeholder="Type Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tanggal Aplikasi{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-1/3">
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            No Persetujuan{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-1/3">
                            <Input placeholder="Type Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tanggal Persetujuan{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-1/3">
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="satuanTerkecil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#525252] font-bold">
                          Status Rekening{" "}
                          <span className="text-[#D92D20]">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                              <SelectValue placeholder="Type to select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="7162317328">
                              7162317328
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-2 border-solid p-4 rounded-lg mb-4">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Data Nasabah
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            ID Nasabah <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/3 border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            No Nasabah <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input placeholder="Type Here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-[#525252] font-bold  text-sm">
                      Blacklist Type
                    </p>
                  </div>
                </div>

                <div className="border-2 border-solid p-4 rounded-lg mb-4">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Data Produk
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            ID Produk <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/3 border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nama Produk{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input placeholder="Type Here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Akad <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/3 border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="text-[#525252] font-bold  text-sm">
                    Distribusi Imbal Hasil
                  </p>
                </div>

                <div className="border-2 border-solid p-4 rounded-lg mb-4">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Data Pemasok / Developer
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            ID Pemasok
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nama Pemasok{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input placeholder="Type Here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nomor ID PO
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tanggal PO <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-2 border-solid p-4 rounded-lg mb-4">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Data Kelompok
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            ID Petugas CMO{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nama Petugas CMO{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-1/3">
                            <Input placeholder="Type Here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            ID Kelompok{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nama Kelompok{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input placeholder="Type Here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="kolektor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#525252] font-bold">
                          Deskripsi Kelompok
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input placeholder="Type Here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-2 border-solid p-4 rounded-lg mb-4">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Data Kelompok
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            ID Lembaga <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/3 border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nama Lembaga{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-1/3">
                            <Input placeholder="Type Here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="kolektor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#525252] font-bold">
                          Deskripsi Lembaga
                        </FormLabel>
                        <FormControl className="w-full">
                          <Input placeholder="Type Here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-2 border-solid p-4 rounded-lg mb-4">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Data Kelompok
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            ID Take Over{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-1/3 border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nama Take Over{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-1/3">
                            <Input placeholder="Type Here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-2 border-solid p-4 rounded-lg mb-4">
                  <h3 className="text-[#1454AE] text-lg font-semibold mb-4 space-y-2">
                    Data Rekening
                  </h3>

                  <div className="mb-4">
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Reference Bank Account / Virtual Account
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input placeholder="Type Here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Jumlah Debitur{" "}
                            <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl className="w-full">
                            <Input placeholder="Type Here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nomor PK Lama
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tanggal PK Lama
                          </FormLabel>
                          <FormControl className="w-1/3">
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nomor PK Baru
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tanggal PK Baru
                          </FormLabel>
                          <FormControl className="w-1/3">
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="satuanTerkecil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Nomor Akte Notaris
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Type to select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7162317328">
                                7162317328
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kolektor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Tanggal Akte Notaris
                          </FormLabel>
                          <FormControl className="w-1/3">
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="md:col-span-2 flex justify-end space-x-4">
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
