const OrDivider = ({ text }: { text: string }) => (
  <div className="relative py-1 flex">
    <div className="flex-1 inset-0 flex items-center">
      <div className="w-full border-t border-[#323546]"></div>
    </div>
    <div className="relative flex justify-center">
      <span className="px-3 text-white text-xs md:text-sm font-semibold">{text}</span>
    </div>
    <div className="flex-1 inset-0 flex items-center">
      <div className="w-full border-t border-[#323546]"></div>
    </div>
  </div>
)

export default OrDivider