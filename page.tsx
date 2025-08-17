 <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Panel 1: Informasi Dasar Konsorsium */}
              <AppAccordion
                title={"Informasi Dasar Konsorsium"}
                content={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="noLoan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            No Loan <span className="text-[#D92D20]">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-11 border-gray-300 focus:border-[#1454AE] focus:ring-[#1454AE]/20 bg-white"
                              placeholder="No Loan"
                              value={field.value}
                              disabled={true}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <label className="text-[#525252] font-bold">
                        Status Peserta{" "}
                      </label>
                      <Combobox
                        options={refStatusPeserta}
                        value={form.watch("statusPeserta") ?? ""}
                        onChange={(val) => form.setValue("statusPeserta", val)}
                        title="Pilih Status Peserta"
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="statusDanaBankPelapor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            Status Dana Bank Pelapor
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-11 border-gray-300 focus:border-[#1454AE] focus:ring-[#1454AE]/20 bg-white"
                              placeholder="Status Dana Bank Pelapor"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pkSindikasi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#525252] font-bold">
                            PK Sindikasi
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-11 border-gray-300 focus:border-[#1454AE] focus:ring-[#1454AE]/20 bg-white"
                              placeholder="PK Sindikasi"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                }
              />

              {/* Panel 2: Lokasi & Keterkaitaan */}
              <AppAccordion
                title={"Lokasi & Keterkaitaan"}
                content={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[#525252] font-bold">
                        Kode Kota{" "}
                      </label>
                      <Combobox
                        options={refKodeKota}
                        value={form.watch("kodeKota") ?? ""}
                        onChange={(val) => form.setValue("kodeKota", val)}
                        title="Pilih Kode Kota"
                        optionLabelKey={"deskripsi"}
                        optionValueKey={"kode"}
                        placeholder="Pilih Kode Kota"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#525252] font-bold">Terkait</label>
                      <Combobox
                        options={refTerkait}
                        value={form.watch("terkait") ?? ""}
                        onChange={(val) => form.setValue("terkait", val)}
                        title="Pilih Terkait"
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="kodeTerkait"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-[#525252] font-bold">
                            Kode Terkait
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-11 border-gray-300 focus:border-[#1454AE] focus:ring-[#1454AE]/20 bg-white"
                              placeholder="Kode Terkait"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                }
              />

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="h-11 px-8 border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
                >
                  Kembali
                </Button>
                <Button
                  type="submit"
                  className="h-11 px-8 bg-[#1454AE] hover:bg-[#174a96] text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Simpan
                </Button>
              </div>
            </form>
          </Form>
