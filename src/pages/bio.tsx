interface BioProps {}

const Bio: React.FC<BioProps> = (props) => {
  return (
    <div className=''>
      <p className='text-center text-5xl p-8'>I&apos;m Noel Vega</p>
      <p className='text-center'>Noel Vega&apos;s bio here</p>
    </div>
  );
};

export default Bio;
